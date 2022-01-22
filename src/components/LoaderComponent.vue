<template>
    <div v-if="visibleBool" class="d-flex justify-content-center m-5">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">{{text}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visibleBool: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: 'Loading...'
        }
    }
}
</script>