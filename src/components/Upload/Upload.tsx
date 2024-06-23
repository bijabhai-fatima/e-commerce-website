import React, { useEffect, useState } from "react"
import { MdCloudUpload, MdDelete } from "react-icons/md"
import { AiFillFileImage } from "react-icons/ai"
import { IoMdClose } from "react-icons/io"
import { setProductPhotos } from "../../state/newProduct/newProductSlice"

type UploadPropType = {
    data: FileList | null
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Upload = ({ data, handleChange }: UploadPropType) => {
    const [uploading, setUploading] = useState(false)
    const [images, setImages] = useState<FileList | null>(data)

    const localHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImages(e.target.files)
        handleChange(e)
    }
    return (
        <div>
            <input
                type="file"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    localHandleChange(e)
                }
            />
        </div>
    )
}

export default Upload
