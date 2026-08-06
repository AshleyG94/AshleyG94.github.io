<template>
<div class = "video-box">
    <div class = "video">
        <video
            ref="videoElement"
            v-bind:src="currentUrl"
            autoplay
            muted
            loop
            playsinline
            webkit-playsinline
            preload="metadata"
            @error="onError"
        >
        </video>
    </div>
</div>
</template>

<script setup>
import { ref, computed } from "vue";

const { videos } = defineProps({ videos: {type: Array, required: true} });
const currentIndex = ref(0)
const currentUrl = computed(() => videos[currentIndex.value]);

function onError(){
    if (currentIndex.value + 1 < videos.length) {
        currentIndex.value++
    }
}
</script>

