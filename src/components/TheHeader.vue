<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Senlleiras</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            :to="{
                                name: 'Home'
                            }"
                        >Home</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >Especies</a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <router-link
                                    class="dropdown-item"
                                    :to="{
                                        name: 'Catalogo'
                                    }"
                                >Listado</router-link>
                            </li>
                            <li>
                                <hr class="dropdown-divider" />
                            </li>
                            <li>
                                <router-link
                                    class="dropdown-item"
                                    :to="{
                                        name: 'Specie'
                                    }"
                                >Nueva especie</router-link>
                            </li>
                        </ul>
                    </li>                   
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about" navbar-brand>Acerca de</router-link>
                    </li>                    
                </ul>
            </div>
        </div>
    </nav>
</template>