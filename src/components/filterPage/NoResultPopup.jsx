import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"


const NoResultPopup = ({ resetFilters, setNoResult, noResult }) => {
    return (
        <AlertDialog open={noResult} onOpenChange={setNoResult}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader className="mt-4 mb-1">
                    <AlertDialogTitle>! لم يتم العثور على وصفات  وفقًا للخيارات</AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={resetFilters} className='flex items-center bg-blue rounded-[4px] mt-4 sm:mt-0 py-2 px-6 hover:bg-[#007AFFCC] duration-300'>
                        <span className='text-white text-lg mr-3'>إعادة كل الاختيارات</span>
                        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5001 2.41698C14.0677 2.42543 16.5253 3.46062 18.3251 5.29189H15.3333C14.804 5.29189 14.375 5.72093 14.375 6.25018C14.375 6.77943 14.804 7.20847 15.3333 7.20847H19.3035C20.2861 7.20793 21.0826 6.41149 21.0831 5.4289V1.45865C21.0831 0.929394 20.6541 0.500359 20.1248 0.500359C19.5956 0.500359 19.1665 0.929394 19.1665 1.45865V3.45002C14.4547 -0.793486 7.19496 -0.413818 2.95145 4.29803C1.29079 6.14201 0.272218 8.47442 0.0483794 10.9459C-0.000853408 11.4765 0.389461 11.9466 0.920151 11.9959C0.9489 11.9985 0.977784 11.9999 1.00671 12C1.49244 12.0062 1.90306 11.6417 1.95449 11.1586C2.3966 6.21447 6.53624 2.42349 11.5001 2.41698Z" fill="#FFFA39" />
                            <path d="M21.9944 12.0001C21.5087 11.9939 21.098 12.3584 21.0466 12.8415C20.5893 18.1068 15.9502 22.0045 10.6848 21.5471C8.4067 21.3492 6.27473 20.3421 4.67497 18.7082H7.66681C8.19607 18.7082 8.6251 18.2792 8.6251 17.7499C8.6251 17.2206 8.19607 16.7916 7.66681 16.7916H3.69656C2.71424 16.7911 1.91753 17.587 1.91699 18.5692C1.91699 18.5699 1.91699 18.5705 1.91699 18.5712V22.5414C1.91699 23.0707 2.34603 23.4997 2.87528 23.4997C3.40453 23.4997 3.83357 23.0707 3.83357 22.5414V20.5501C8.54541 24.7936 15.8051 24.4139 20.0486 19.7021C21.7093 17.8581 22.7279 15.5257 22.9517 13.0542C23.001 12.5235 22.6106 12.0534 22.08 12.0042C22.0515 12.0016 22.0229 12.0002 21.9944 12.0001Z" fill="#FFFA39" />
                        </svg>
                    </AlertDialogAction>
                    <AlertDialogCancel>إغلاق</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NoResultPopup