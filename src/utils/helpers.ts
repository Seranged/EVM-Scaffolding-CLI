import * as fs from 'fs'
import * as path from 'path'

/**
 * Check if a file or directory exists at the given path.
 *
 * @param {string} filePath - The path to the file or directory.
 * @returns {boolean} - True if the file or directory exists, false otherwise.
 */
function fileExists(filePath: fs.PathLike) {
  try {
    fs.accessSync(filePath)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Get the absolute path of a file or directory.
 *
 * @param {string} relativePath - The relative path to the file or directory.
 * @returns {string} - The absolute path to the file or directory.
 */
function getAbsolutePath(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

module.exports = {
  fileExists,
  getAbsolutePath,
}