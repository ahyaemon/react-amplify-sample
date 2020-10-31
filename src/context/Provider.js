import React from 'react'
import {AuthProvider} from './AuthProvider'
import {AuthConfirmProvider} from './AuthConfirmProvider'

export const Provider = ({ children }) => {
    return (
        <AuthProvider>
            <AuthConfirmProvider>
                { children }
            </AuthConfirmProvider>
        </AuthProvider>
    )
}
