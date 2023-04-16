<script lang="ts">
    let items: string[] = [
        'Item #1',
        'Item #2',
        'Item #3',
        'Item #4',
        'Item #5'
    ];

    let thingy = 'xd';
</script>

<nav class="navbar bg-purple-700">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">{thingy} - ćwiczenia aplikacja przeglądarkowa z połączeniem do internetu</a>
    </div>
    <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
            <li>
                <a href="/">O_o</a>
            </li>
            <li>
                <div>
                    Ity
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                </div>
                <ul class="p-2 bg-purple-800">
                    {#each items as item}
                        <li>
                            <a href="/">{item}</a>
                        </li>
                    {/each}
                </ul>
            </li>
            <li>
                <a href="/">^_^</a>
            </li>
        </ul>
    </div>
</nav>