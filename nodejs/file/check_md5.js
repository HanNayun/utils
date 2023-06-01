/// 检查文件的md5值

import fs from "fs";
import crypto from "crypto";

/**
 * 根据输入的文件路径计算文件的md5值
 * @param {String} file_path 文件路径
 * @returns {String} 文件的md5值
 */
function calculateMD5(file_path) {
    const hash = crypto.createHash("md5");
    const file_data = fs.readFileSync(file_path);
    hash.update(file_data);

    return hash.digest("hex");
}

/**
 * 判断两个文件的md5是否相同
 * @param {String} file1_path 文件路径1
 * @param {String} file2_path 文件路径2
 * @returns {boolean} 两个文件的md5是否相同
 */
export function isFileHaveSameMD5(file1_path, file2_path) {
    const file1_md5 = calculateMD5(file1_path);
    const file2_md5 = calculateMD5(file2_path);
    return file1_md5 === file2_md5;
}
