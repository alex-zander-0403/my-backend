import {
  usersCollection,
  videosCollection,
  UserType,
  VideoType,
} from "./db.js";

type VideoOutputModel = {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
  };
};

//
export const videoQueryRepo = {
  // функция mapper
  _mapDBVideoToVideoOutputModel(dbVideo: VideoType, dbUser: UserType) {
    return {
      id: dbVideo.id,
      title: dbVideo.title,
      author: {
        id: dbUser.id,
        name: dbUser.name,
      },
    };
  },

  // ===================={ GET }====================
  async getVideos(): Promise<VideoOutputModel[]> {
    const dbVideos: VideoType[] = await videosCollection.find().toArray();
    const dbAuthors: UserType[] = await usersCollection.find().toArray();

    const outputVideos = dbVideos.map((dbVideo) => {
      const authorVideo = dbAuthors.find((user) => user.id === dbVideo.id);

      return this._mapDBVideoToVideoOutputModel(dbVideo, authorVideo);
    });

    return outputVideos;
  },

  // ===================={ GET /:id }====================
  async getVideoById(id: number): Promise<VideoOutputModel> {
    const dbVideo = await videosCollection.findOne({ id });
    const videoAuthorId = dbVideo!.authorId;
    const authorVideo = await usersCollection.findOne({ videoAuthorId });

    const outputVideo = this._mapDBVideoToVideoOutputModel(
      dbVideo,
      authorVideo,
    );

    return outputVideo;
  },
};
