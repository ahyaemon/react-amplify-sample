import React from 'react'
import {AuthProvider} from './AuthProvider'
import {AuthConfirmProvider} from './AuthConfirmProvider'

type ProviderProps = {}

export const Provider: React.FC<ProviderProps> = (props) => {
    return (
        <AuthProvider>
            <AuthConfirmProvider>
                { props.children }
            </AuthConfirmProvider>
        </AuthProvider>
    )
}
