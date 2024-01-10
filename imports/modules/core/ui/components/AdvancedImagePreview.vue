<template>
    <AdvancedImage :cldImg="img" :plugins="plugins" :alt="name" role="img" :title="name" :aria-describedby="name" />
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { AdvancedImage, lazyload, placeholder } from '@cloudinary/vue'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { computed } from 'vue'

const props = defineProps({
    publicId: { type: String, required: true },
    name: { type: String, required: true },
    width: { type: Number, default: 128 },
    height: { type: Number, default: 128 },
    quality: { type: [String, Number], default: 'auto' }
})
// Create a Cloudinary instance and set your cloud name
const { cloud_name } = Meteor.settings.public.cloudinary;
const cld = new Cloudinary({
    cloud: {
        cloudName: cloud_name
    }
})
//plugins
const plugins = [lazyload({ rootMargin: '0px', threshold: 0.25 }), placeholder({ mode: 'blur' })]
// Instantiate a CloudinaryImage object for the image with the public ID
const img = computed(() => cld.image(props.publicId))
// Apply the transformation
img.value.resize(fill().width(props.width).height(props.height)).format('auto').quality(props.quality)
</script>
<style scoped></style>