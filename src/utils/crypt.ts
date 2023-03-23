import bcrypt from "bcrypt";

export async function encryptData(data: string) {
    const encryptedPassword = await bcrypt.hash(data, 12);

    return encryptedPassword;
}

export async function compareEncrypt(data: string, hash: string) {
    const isValid = await bcrypt.compare(data, hash);

    return isValid;
}