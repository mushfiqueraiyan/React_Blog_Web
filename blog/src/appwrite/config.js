import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

//you can use this code same to same copy paste in your future appwrite project 

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //function for creating post for blog
    async createPost({title, slug, content , featuedImage, status, userID }){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuedImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            throw error
        }
    }

    //function for update post after edit for blog
    async updatePost(slug, {title,  content , featuedImage, status,}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuedImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    //function for delete post for blog
    async deletePost (slug){
        try {
    await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
    )
    return true

} catch (error) {
    throw error
    return false
}
    }

    async getPost (slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
            )
        } 
        catch (error) {
            throw error
            return false
        }
    }

    async getPosts (queries = [Query.equal("status" ,"active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
                
            )
        } catch (error) {
            throw error
            return false
        }

    }

    //file upload Serive 

    async uploadFile (file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file,
            )
        } 
        catch (error) {
            throw error
            return false
        }
    }

    async deleteFile (fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID,
            )
            return true
        } 
        catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID,
        )
    }
}

const service = new Service();
export default service