import { createSelector } from '@reduxjs/toolkit'

import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icons/about-20-20.svg'
import MainIcon from 'shared/assets/icons/main-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'
import ArticlesIcon from 'shared/assets/icons/article-20-20.svg'
import { getUserAuthData } from 'entities/User'

import { SidebarItemType } from '../types/sidebar'

export const getSidebarItems = createSelector(getUserAuthData, (authData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: RoutePath.main,
            Icon: MainIcon,
            text: 'Главная',
        },
        {
            path: RoutePath.about,
            Icon: AboutIcon,
            text: 'О сайте',
        },
    ]

    if (authData) {
        sidebarItemsList.push(
            {
                path: RoutePath.profile + authData.id,
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                Icon: ArticlesIcon,
                text: 'Статьи',
                authOnly: true,
            }
        )
    }

    return sidebarItemsList
})
