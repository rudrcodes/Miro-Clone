'use client'
import React from 'react'
import { EmptySearch } from './empty-search'
import { EmptyFavorites } from './empty-favs'
import { EmptyBoards } from './empty-boards'
interface BoardListProps {
    orgId: string,
    query: {
        search?: string,
        favorites?: string,
    }
}
const BoardList = ({ orgId, query }: BoardListProps) => {
    const data = []  //TODO:Change to API call

    if (!data?.length && query.search) {
        return <EmptySearch />
    }
    if (!data?.length && query.favorites) {
        return <EmptyFavorites />

    }
    if (!data?.length) {
        return <EmptyBoards />
    }


    return (
        <div>
        </div>
    )
}

export default BoardList