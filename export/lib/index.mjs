import * as fs from 'fs';

export const getDirectory = async (basepath) => {
  const files = await fs.readdirSync(basepath, { recursive: true })
  return files
}

export const getFile = async (basepath,file) => {
  const fileContents = await fs.readFileSync(`${basepath}/${file}`, 'utf8')
  return fileContents
}