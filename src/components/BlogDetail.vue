
<template>
    <div class="post">
        <div v-if="loading" class="loading">
            No Data for this blog title found.
        </div>

        <div v-if="post" class="content">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Short Description</th>
                        <th>Author Date</th>
                        <th>Topic</th>
                        <th>Publish Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ post.title }}</td>
                        <td>{{ post.shortDescription }}</td>
                        <td>{{ post.authorName }}</td>
                        <td>{{ post.topic }}</td>
                        <td>{{ post.publishDate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="upload">
            <input type="file" id="myfile" name="filename">
            <button @click="submitFile">Upload</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    type Blog = {
        Name: string,
        AggregateCount: number,
        Style: string,
        Title: string,
        ShortDescription: string,
        AuthorName: string,
        Topic: string,
        PublishDate: string
    };


    interface Data {
        loading: boolean,
        post: null | Blog,
        file: File
    }

    export default defineComponent({
        data(): Data {
            return {
                loading: false,
                post: null,
                file: new File((new Array<Blob>()),"Mock.zip", {type: 'application/zip'})
            };
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData();
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData'
        },
        methods: {
            fetchData(): void {
                this.post = null;
                this.loading = true;


                fetch('/api/blogcontent/' + this.$route.params.title)
                    .then(r => r.json())
                    .then(json => {
                        this.post = json as Blog;
                        this.loading = false;
                        return;
                    });
            },
            uploadFile() {
                this.file = (this.$refs.file as any).files[0];
            },
            submitFile() {
                const formData = new FormData();
                formData.append('file', this.file);

                let xhr = new XMLHttpRequest();
                xhr.open("POST", '/api/blogcontent');
                xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=-------------6585008198');
                xhr.send(formData);
                //fetch('/api/blogcontent', {
                //    method: 'POST',
                //    headers: {
                //        'Content-Type': 'multipart/form-data; boundary=-------------6585008198'
                //    },
                //    body: formData,
                //})
            }
        },
        async mounted(){
            await this.fetchData()
    }
    });
</script>