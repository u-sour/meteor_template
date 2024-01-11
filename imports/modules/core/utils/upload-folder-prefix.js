import { Meteor } from 'meteor/meteor'
const { upload_root_folder } = Meteor.settings.public.cloudinary

const uploadFolderPrefix = {
  root: upload_root_folder,
  profile: `${upload_root_folder}/Profile`,
}

export default uploadFolderPrefix
