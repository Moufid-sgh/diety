import { Progress } from "@/components/ui/progress"

const ProgressBar = ({ title, subtitle, value, className }) => {
    
    return (
        <div className='flex items-center mb-2'>
            <div>
                <span className="text-lg w-full">{title}</span>
                <Progress value={value} className={className} />
                <span>{subtitle}</span>
            </div>
           <span className="mr-4">{value} g</span> 
        </div>
    )
}

export default ProgressBar