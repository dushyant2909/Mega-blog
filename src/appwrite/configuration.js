import { Databases, Client, Storage, ID, Query } from 'appwrite';
import config from '../config/config';

class Services {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client.setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    //create post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            //give attributes values
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,//You can also give id.unique() in document-id
                {
                    Title: title,
                    content,
                    featuredImage,
                    Status: status,
                    UserId: userId,
                }
            )
        } catch (error) {
            console.log("Error in createPost: ", error);
        }
    }
    //update post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    Title:title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Error in update post: ", error);
        }
    }
    //delete post
    async deletePost(slug) {
        try {
            //do not return just delete
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Error in deletePost:", error);
            return false;
        }
    }

    //read selected post
    async readPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error in read post: ", error);
        }
    }

    //get only active status post
    //In query give index key set in appwrite indexes
    async getPosts(query = [Query.equal("Status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                // [
                //     Query.equal("status", "active")
                // ],
                query,
            )
        } catch (error) {
            console.log("Error in getPosts: ", error);
        }
    }

    //File related services (File = Image)
    //File upload
    async fileUpload(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Error in file upload: ", error);
            return false;
        }
    }
    //delete file
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error in delete file: ", error);
            return false;
        }
    }
    //get file preview
    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId)
        } catch (error) {
            console.log("Error in getting file preview: ", error);
            return false;
        }
    }

}

const service = new Services();

export default service;