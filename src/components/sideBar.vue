<template>
    <aside class="menu-sidebar d-none d-lg-block">
            <div class="logo">
                <router-link to="/">
                    <h3 style="color:#009">Hr Management</h3>
                </router-link>
            </div>
            <div class="menu-sidebar__content js-scrollbar1 ps">
                <nav class="navbar-sidebar">
                    <ul class="list-unstyled navbar__list">
                        <li>
                            <router-link to="/dashboard">
                                <i class="zmdi zmdi-home"></i>Home
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/jobs">
                                <i class="zmdi zmdi-time"></i>Jobs
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/candidates">
                                <i class="far fa-check-square"></i>Candidates
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/reports">
                                <i class="zmdi zmdi-book"></i>Reports
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/calendar">
                                <i class="fas fa-calendar-alt"></i>Calendar
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/users">
                                <i class="fa fa-users"></i>Users
                            </router-link>
                        </li>
                    </ul>
                </nav>
            <div class="ps__rail-x" style="left: 0px; bottom: 0px;"><div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps__rail-y" style="top: 0px; right: 0px;"><div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div></div>
        </aside>
</template>