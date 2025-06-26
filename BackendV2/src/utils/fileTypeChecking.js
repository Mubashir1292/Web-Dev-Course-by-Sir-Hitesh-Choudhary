import fs from 'fs';
import {promises as pro} from 'fs';
const isVideoByMime = (mimeType) => {
    const videoMimes = [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-matroska',
        'video/x-flv',
        'video/x-ms-mv',
        'video/webm',
    ];
    return videoMimes.includes(mimeType);
}
const isVideoByMagicNumber = async (filePath) => {
    const buffer = Buffer.alloc(12);
    fs.readSync(fs.openSync(filePath,'r'),buffer,0,12,0);
    const hex=buffer.toString('hex');
    const videoSignatures = [
        {
            type: "MP4",
            check: (hex) => hex.substring(8, 12) === '66747970', // 'ftyp'
            offset: [4, 8]
        },
        {
            type: "AVI",
            check: (hex) => hex.substring(0, 4) === '52494646' && hex.substring(8, 12) === '41564920', // 'RIFF' + 'AVI '
            offset: [0, 12]
        },
        {
            type: "MKV",
            check: (hex) => hex.substring(0, 4) === '1a45dfa3',
            offset: [0, 4]
        },
        {
            type: "FLV",
            check: (hex) => hex.substring(0, 4) === '464c5601',
            offset: [0, 4]
        },
        {
            type: "WebM",
            check: (hex) => hex.substring(0, 4) === '1a45dfa3', // Same as MKV but would need deeper check
            offset: [0, 4]
        },
        {
            type: "WMV",
            check: (hex) => hex.substring(0, 8) === '3026b2758e66cf11',
            offset: [0, 8]
        },
        {
            type: "MPG",
            check: (hex) => hex.substring(0, 6) === '000001',
            offset: [0, 3]
        },
        {
            type: "OGG",
            check: (hex) => hex.substring(0, 4) === '4f676753', // 'OggS'
            offset: [0, 4]
        },
        {
            type: "VOB",
            check: (hex) => hex.substring(0, 4) === '000001ba',
            offset: [0, 4]
        },
        // TS needs special handling as it looks for 0x47 at position 0
        {
            type: "TS",
            check: (buffer) => buffer[0] === 0x47,
            bufferCheck: true
        }
    ];
    for (const signature of videoSignatures) {
        if (signature.bufferCheck) return true;
        else if (signature.check(hex))
            return true;
    }
    return false;
}
const isImageByMagicNumber = async (filePath) => {
    const file = await pro.open(filePath, 'r');
    const {buffer} = await file.read({ buffer: Buffer.alloc(12), length: 12 });
    await file.close();
    const hex = buffer.toString("hex", 0, 12);
    const imageSignatures = [
        {
            type: "JPEG",
            check: (hex) => hex.startsWith("ffd8ff")
        },
        {
            type: "png",
            check: (hex) => hex.startsWith("89504e470d0a1a0a")
        },
        {
            type: "GIF",
            check: (hex) => hex.startsWith("47494638")
        },
        {
            type: "WebP",
            check: (hex) => hex.startsWith("52494646")
        },
        {
            type: "BMP",
            check: (hex) => hex.startsWith("424d")
        },

    ];
    const fileTypeCheck=imageSignatures.find(item=>item.check(hex));
    return fileTypeCheck.type;
}
export { isVideoByMime, isVideoByMagicNumber, isImageByMagicNumber };
