import conf from "../conf/conf.js";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appWriteUrl) // Your API Endpoint
            .setProject(conf.appWriteProjectId) // Your project ID
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,FeaturedImage,status,userId}){
        try {
            return await this.databases.createDocument({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                documentId: slug,   // or ID.unique()
                data: {
                    title,
                    content,
                    FeaturedImage,
                    status,
                    userId,
                }
            })
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,FeaturedImage,status}){
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appWriteDatabaseId, 
                collectionId: conf.appWriteCollectionId,
                documentId: slug,
                data: {
                    title,  
                    content,
                    FeaturedImage,
                    status,
                }
            })
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }

     async deletePost(slug){
            try {
                return await this.databases.deleteDocument({
                    databaseId: conf.appWriteDatabaseId, 
                    collectionId: conf.appWriteCollectionId,
                    documentId: slug,
                })
                return true
            } catch (error) {
                console.log("Appwrite Service :: deletePost :: error", error);
                return false 
            }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId: conf.appWriteDatabaseId, 
                collectionId: conf.appWriteCollectionId,
                documentId: slug,
            })

        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);

        }
    }

    async getPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appWriteDatabaseId,
                collectionId: conf.appWriteCollectionId,
                queries
            })
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appWriteBucketId,
                fileId: ID.unique(),
                file,
            })
            return true
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile({
                bucketId: conf.appWriteBucketId,
                fileId
            })
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false
        }
    } 

    getFilePreview(fileId){
        return this.bucket.getFileView({
            bucketId: conf.appWriteBucketId,
            fileId,
        })
    }
}

const service = new Service()
export default service