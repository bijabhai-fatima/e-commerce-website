import axios from "axios"

export const pinFileToIPFS = async (file: any, name: string) => {
    try {
        const formData = new FormData()

        formData.append("file", file)

        const pinataMetadata = JSON.stringify({
            name: name,
        })

        formData.append("pinataMetadata", pinataMetadata)
        console.log("metadata..", pinataMetadata)

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        })
        formData.append("pinataOptions", pinataOptions)

        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    pinata_api_key: "b957d399e1cefaa66b73",
                    pinata_secret_api_key:
                        "20e61cad86d8bdf9ae98b5bb3b14d9b833dcef49ffda1e7f0903ec2185b0eb39",
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        console.log(res.data)
        console.log(
            `View the file here: https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`
        )

        return res.data.IpfsHash
    } catch (error) {
        // console.log("there is an error")
        return error
    }
}
