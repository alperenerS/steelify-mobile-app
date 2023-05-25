const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');

const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(
  `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`
);

async function uploadFile(fileData, fileName) {
  const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
  await containerClient.createIfNotExists();
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileData);
  return blockBlobClient.url;
}

module.exports = {
  uploadFile,
};
