'use client'

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Spinner from "@/components/Spinner"
import { toast } from "sonner"


const ProfileImage = ({ userId }) => {

    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        const newFile = acceptedFiles[0];

        if (newFile.size > 2 * 1024 * 1024) {
            toast.info("الملف كبير جدا. الحجم الأقصى هو 2MB");
            return;
        }

        setFile(newFile);
        setPreview(URL.createObjectURL(newFile));
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
        multiple: false,
        noClick: true,
        onDrop,
    });


    const uploadImage = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", userId);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload-profile`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            setPreview(data.imageUrl);
        } else {
            console.error(data.error);
        }

        setLoading(false);
    };


    return (
        <div dir="rtl" className="mt-8 w-full flex flex-col justfiy-start" {...getRootProps()}>
            <input {...getInputProps()} />

            {/* Avatar + Dropzone */}
            <Avatar className="size-20">
                <AvatarImage
                    src={preview || ""}
                    alt="Photo de profil"
                    className="object-cover"
                />
                <AvatarFallback className="border    border-blue flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </g>
                    </svg>
                </AvatarFallback>
            </Avatar>

            <p className="text-sm text-[#262F826E] mt-2">
                إتنجم تحمل وإلا تغير صورتك حسابك<br /> بصيغة webp , jpeg أو png.
            </p>

            {isDragActive && (
                <p className="text-xs text-blue-500 mt-1">أسقط الصورة هنا...</p>
            )}

            {/* upload / changer */}
            <button
                onClick={() => (file ? uploadImage() : open())}
                disabled={loading}
                className="flex items-center justify-center px-5 py-2.5 mt-8 outline-none bg-blue hover:bg-[#31363F3B] active:bg-black duration-500 text-white rounded-[8px] w-full sm:w-80 group overflow-hidden font-medium"
            >
                <span className="ml-1.5">{file ? "تأكيد تحميل الصورة" : "تحميل صورة"}</span>
                {loading && <Spinner />}
            </button>
        </div>
    );
};

export default ProfileImage;
