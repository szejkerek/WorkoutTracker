<script lang="ts">
	import SideMenuItem from "./SideMenuItem.svelte";
    import homeIcon from "$lib/static/icons/home-icon.svg";
    import searchIcon from "$lib/static/icons/search-icon.svg";
    import notificationsIcon from "$lib/static/icons/notifications-icon.svg";
    import profileIcon from "$lib/static/icons/profile-icon.svg";
    import settingsIcon from "$lib/static/icons/settings-icon.svg";
    import reportIcon from "$lib/static/icons/report-icon.svg";
	import { page } from "$app/stores";
    import logo from "$lib/static/Logo.png";

    let pages: {
        name: string,
        route: string,
        icon: string
    }[] = [
        {
            icon: homeIcon,
            name: "Home",
            route: "/feed"
        },
        {
            icon: searchIcon,
            name: "Search",
            route: "/feed"
        }, 
        {
            icon: notificationsIcon,
            name: "Notifications",
            route: "/feed"
        },
        {
            icon: profileIcon,
            name: "Profile",
            route: "/feed"
        },
        {
            icon: settingsIcon,
            name: "Settings",
            route: "/feed"
        },
        {
            icon: reportIcon,
            name: "Report",
            route: "/feed"
        }
    ];
</script>

<div class="w-1/2 flex flex-col items-start justify-between h-screen pb-16">
    <div> 
        <div class="pt-12">
            <img src={logo} alt="logo" class="w-24 h-24 mb-12 -translate-x-1/3"/>
        </div>
        <div>
            {#each pages as page }
                <p>
                    <SideMenuItem name={page.name} route={page.route} icon={page.icon}/>
                </p>
            {/each}
        </div>
    </div>
    <div>
        <SideMenuItem name="Logout" route="/feed" icon={homeIcon}/>
    </div>
</div>
