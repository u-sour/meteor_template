import { Meteor } from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin'
import { isEmpty } from 'lodash'
import SimpleSchema from 'simpl-schema'

// config
import cloudinary from '../../../startup/server/cloudinary.config'
// security
import { userIsInRole, userLoggedIn } from '../../../utils/security'
// responses
import { throwError, throwSuccess } from '../../../utils/responses'

Meteor.methods({
  'core.admin.upload.create': async ({ upload }) => {
    try {
      // Check authorization
      userLoggedIn()
      // Use the uploaded file's name as the asset's public ID and
      // allow overwriting the asset with new versions
      const options = {
        folder: upload.folder,
        use_filename: true,
        unique_filename: false,
      }
      // const data = []
      // for (let index = 0; index < base64Files.length; index++) {
      //   const base64File = base64Files[index].base64
      //   data.push(await cloudinary.uploader.upload(base64File, options))
      // }
      const data = await cloudinary.uploader.upload(upload.base64, options)
      return throwSuccess.general({
        status: 201,
        data: data,
        message: 'Transaction is created.',
      })
    } catch (error) {
      throwError(error)
    }
  },
  'core.admin.upload.edit.profile': async ({ upload }) => {
    try {
      const { folderPath, base64 } = upload

      // Check authorization
      userLoggedIn()

      // create a folder
      const folder = await cloudinary.api.create_folder(folderPath)

      // Use the uploaded file's name as the asset's public ID and
      // allow overwriting the asset with new versions
      const options = {
        folder: folder.path,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      }

      // delete all files exist in folder path from cloudinary
      if (folderPath) {
        await cloudinary.api.delete_resources_by_prefix(folderPath)
      }

      // upload a new file
      const data = await cloudinary.uploader.upload(base64, options)
      return throwSuccess.general({
        status: 201,
        data: data,
        message: 'Transaction is edited.',
      })
    } catch (error) {
      throwError(error)
    }
  },
  'core.admin.upload.find': async ({ folder }) => {
    try {
      const options = { type: 'upload', prefix: folder }
      const data = await cloudinary.api.resources(options)
      return throwSuccess.general({
        status: 200,
        data: data,
      })
    } catch (error) {
      throwError(error)
    }
  },
  'core.admin.upload.remove': async ({
    publicId,
    deleteEmptyFolder = false,
    folderPath,
  }) => {
    try {
      // Check role
      userIsInRole(['super', 'admin'])

      // delete resource by publicId
      await cloudinary.uploader.destroy(publicId)

      // delete folder
      if (deleteEmptyFolder && folderPath) {
        const options = { type: 'upload', prefix: folderPath }
        // find all resources in folder
        const data = await cloudinary.api.resources(options)
        // if folder doesn't has any resources delete folder
        if (isEmpty(data.resources)) {
          await cloudinary.api.delete_folder(folderPath)
        }
      }
      return throwSuccess.general({
        status: 202,
        message: 'Transaction is removed.',
      })
    } catch (error) {
      throwError(error)
    }
  },
})
