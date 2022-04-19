<template>
    <div class="post">
        <div v-if="loading" class="loading">
            Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationvue">https://aka.ms/jspsintegrationvue</a> for more details.
        </div>

        <div v-if="post" class="content">
            <select v-if="filterOptions">
                <option value="-1">Filter By Topic</option>
                <option v-for="topic in filterOptions" :key="topic" :value="topic">{{ topic }}</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Aggregate Count</th>
                        <th>Style</th>
                        <th>Topic</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="blog in post" :key="blog.name">
                        <td><router-link :to="{name : 'about', params: {title: blog.Name}}">{{ blog.Name }}</router-link></td>
                        <td>{{ blog.AggregateCount }}</td>
                        <td>{{ blog.Style }}</td>
                        <td>{{ blog.Topic }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <router-view/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    type Blogs = {
        Name: string,
        AggregateCount: number,
        Style: string,
        Title: string,
        ShortDescription: string,
        AuthorName: string,
        Topic: string,
        PublishDate: string
    }[];


    interface Data {
        loading: boolean,
        post: null | Blogs,
        filter: string,
        filterOptions: null | Array<string>
    }

    export default defineComponent({
        data(): Data {
            return {
                loading: false,
                post: null,
                filter: "",
                filterOptions: null
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

                fetch('/api/blogcontent')
                    .then(r => r.json())
                    .then(json => {
                        this.post = json as Blogs;
                        this.loading = false;
                        this.filterOptions = [...new Set(this.post.map(item => item.Topic))];
                        return;
                    });
            },
            filterListings(filter: string): void {
                if (this.post != null) {
                    this.post = this.post.filter((blog) => blog.Topic.match(filter))
                }
            }
        },
    });
</script>