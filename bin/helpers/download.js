/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-25 16:19:59
 * @Description: download
 */

const download = require('download-git-repo');

/**
 * 从 github 上下载相应的 repo 到 projectName
 * @method downloadFromGithub
 * @param {string}  repo
 * @param {string}  target
 * @param {function} callback
 */
module.exports = function _download (repo, target, callback) {
    return download(repo, target, function(err) {
        if (err) return err;

        typeof callback == 'function' && callback();
    });
};
