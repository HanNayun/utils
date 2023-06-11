/// 复制文件夹

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import fsExtra from 'fs-extra';
import { isFileHaveSameMD5 } from './check_md5.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * 更新文件夹
 * @param {String} src_folder 源文件夹
 * @param {String} target_folder 需要被更新的文件夹
 * @param {String} updated_folder 更新的内容
 */
export function updateFolder(src_folder, target_folder, updated_folder) {
    if (!fs.existsSync(updated_folder))
        fs.mkdirSync(updated_folder);
    else
        fsExtra.emptyDirSync(updated_folder);

    if (!fs.existsSync(target_folder))
        fs.mkdirSync(target_folder);

    if (!fs.existsSync(src_folder))
        throw new Error(`src_folder ${src_folder} not exist`);

    recursiveCopy(src_folder, target_folder, updated_folder);
}

/**
 * 递归复制文件夹，同时将更新的文件复制到updated_folder
 * @param {String} from 源文件夹
 * @param {String} to 目标文件夹
 * @param {String} updated_folder 更新文件夹
 */
function recursiveCopy(from, to, updated_folder) {
    const files = fs.readdirSync(from);
    files.forEach(file => {
        const file_path = path.join(from, file);
        const target_path = path.join(to, file);
        const updated_path = path.join(updated_folder, file);

        const stats = fs.statSync(file_path);
        const is_directory = stats.isDirectory();
        if (is_directory) {
            if (!fs.existsSync(target_path))
                fs.mkdirSync(target_path);
            recursiveCopy(file_path, target_path, updated_path); 
        }
        else {
            if (fs.existsSync(target_path) && isFileHaveSameMD5(file_path, target_path))
                return;

            fs.copyFileSync(file_path, target_path);
            copyTo(file_path, updated_path);
        }
    });
}

/**
 * 
 * @param {String} src_path 源文件
 * @param {String} target_path 目标路径
 */
function copyTo(src_path, target_path) {
    const folder = path.dirname(target_path);
    createFolder(folder);

    fs.copyFileSync(src_path, target_path);
}

/**
 * 创建文件夹
 * @param {String} folder 要创建的文件夹
 */
function createFolder(folder) {
    const base = path.dirname(folder);

    if (!fs.existsSync(base))
        createFolder(base);

    if (!fs.existsSync(folder))
        fs.mkdirSync(folder);
}

const src_folder = path.join(__dirname, '../../../client/yverse/release/wxgame'); // 源文件夹相对路径
const target_folder = path.join(__dirname, '../../release_resource'); // 目标文件夹相对路径
const updated_folder = path.join(__dirname, '../../updated'); // 更新文件夹相对路径
updateFolder(src_folder, target_folder, updated_folder);

