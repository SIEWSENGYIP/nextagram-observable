export interface Users {
    id : number
    username : string
    profileImage : string
}

export interface UserProfiles {
    id: number
    username: string
    description: string
    blogLink: string
    facebookLink: string
    email: string
}

export interface ImageComments {
    userId: number
    imageId: number
    author: string
    comment: string
}

export interface ImageLikeCount {
    userId: number
    imageId: number
    likeCount: number
}