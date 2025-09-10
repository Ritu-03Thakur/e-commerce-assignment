import Link from "next/link"


interface buttonProps {
    href ?: string  ,
    text : string , 
    variant : "primary" | "secondary" , 
    disabled ?: boolean , 
    className ?: string
    onClick ?: () => void
}


export default function Button({
     href ,
     text ,
     disabled = false,
     className = "" , 
     variant = "primary" , 
     onClick 
    } : buttonProps){

    const variantStyle = {
            primary : "bg-gray-900 hover:bg-gray-700 text-white" , 
            secondary : "border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-500 "
        }
    return (
        <Link href={href || "#"}>
        <button 
        disabled = {disabled}
        className={` w-full flex-1 py-3 px-6 rounded-md font-medium transition-colors
             ${variantStyle[variant]} ${className}`}
        onClick={onClick}
        >
      {text}
        </button>
        </Link>
    )
}