<script lang='ts'>
    export let data: {
        username: String,
        gender: String,
        age: Number,
        country: String
    };
</script>

<div class='text-sm breadcrumbs w-1/2 self-center text-black mt-10'>
    <ul>
        <li>
            <a href='/'>
                Home
            </a>
        </li>
        <li>
            <a href={`/user/${data.username}`}>
                User: {data.username}
            </a>
        </li>
        <li>
            To jest breadcrumb, taka ścieżka obecna jakby
        </li>
    </ul>
</div>
<div class='w-full py-10'>
    <h1 class='my-10 text-6xl text-pink-500 text-center'>
        Strona użytkownika '{data.username}' :3
    </h1>
    <h6 class='text-2xl text-pink-500 text-center'>
        Płeć: {data.gender}
    </h6>
    <h6 class='text-2xl text-pink-500 text-center'>
        Wiek: {data.age}
    </h6>
    <h6 class='text-2xl text-pink-500 text-center'>
        Kraj: {data.country}
    </h6>
    <h6 class='text-2xl text-pink-500 text-center'>
        Normalnie przed załadowaniem zaciągane będą dane z bazy i wypełniana strona infem usera, siedzące w obiekcie "data"
    </h6>
    <code></code>
</div>