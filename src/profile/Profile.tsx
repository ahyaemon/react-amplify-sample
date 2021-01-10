import {API, graphqlOperation} from "aws-amplify";
import React, {ReactElement, useContext, useEffect, useState} from "react";
import styles from "./Profile.module.css"
import {getUser} from "../graphql/queries";
import {AuthContext} from "../context/AuthProvider";
import {updateUser} from "../graphql/mutations";

interface User {
    id: string
    age: number | null
    comment: string | null
}

const UserItem: React.FC<{user: User}> = ({user}) => (
    <div>
        <span>id: {user.id}, </span>
        <span>age: {user.age}, </span>
        <span>comment: {user.comment}</span>
    </div>
)

type EditableInputProps = {
    title: string
    value: number | string | null
    editable: boolean
}

const EditableInput: React.FC<EditableInputProps> = ({ title, value, editable , children}) => {
    return editable ?
        (
            <div>
                <span>{ title }:</span>
                {children}
            </div>
        ):
        (
            <div>
                <span>{ title }:</span>
                { value === null &&
                    <span>未設定</span>
                }
                { value !== null &&
                    <span>{ value }</span>
                }
            </div>
        )
}

type GraphqlResult<T> = { data: T | null }

export const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editable, setEditable] = useState(false)
    const authContext = useContext(AuthContext)
    const [followingUsers, setFollowingUsers] = useState<User[]>([]);
    const [followedUsers, setFollowedUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUser() {
            const result = await API.graphql(graphqlOperation(getUser)) as GraphqlResult<{ getUser: User }>
            const data = result.data
            console.log(data)
            if (data == null) {

            } else {
                const user = data.getUser
                setUser(user)
            }
        }

        fetchUser()
    }, [])

    function handleEditClick() {
        setEditable(true)
    }

    async function handleDoneClick() {
        const a = user && user.age
        try {
            const result = await API.graphql(
                graphqlOperation(
                    updateUser,
                    {
                        id: authContext.authState.name,
                        age: user?.age,
                        comment: user?.comment,
                    }
                ),
            ) as GraphqlResult<{ updateUser: User }>
            console.log('update user succeeded', result)
        } catch (e) {
            console.log('update user failed', e)
        }
        setEditable(false)
    }

    return (
        <div className={styles.profile}>
            <h2>profile</h2>
            { editable &&
                <div>
                    <button type="button" onClick={handleDoneClick}>done</button>
                </div>
            }
            { !editable &&
                <div>
                    <button type="button" onClick={handleEditClick}>edit</button>
                </div>
            }
            <div>
                <div>
                    <span>id: {authContext.authState.name}</span>
                </div>

                <EditableInput title="age" value={user && user.age} editable={editable}>
                    <input
                        type="number"
                        value={ user?.age ?? 0 }
                        onChange={(e) => {
                            if (user === null) {
                                return
                            }
                            setUser({ ...user, age: e.target.valueAsNumber })
                        }}
                    />
                </EditableInput>

                <EditableInput title="comment" value={user && user.comment} editable={editable}>
                    <input
                        type="text"
                        value={ user?.comment ?? '' }
                        onChange={(e) => {
                            if (user === null) {
                                return
                            }
                            setUser({ ...user, comment: e.target.value})
                        }}
                    />
                </EditableInput>

                <div>
                    <span>following:</span>
                    <ul>
                        { followingUsers.map(user => (<li><UserItem user={user}/></li>))}
                    </ul>
                </div>

                <div>
                    <span>followed:</span>
                    <div>
                        { followedUsers.map(user => (<li><UserItem user={user}/></li>))}
                    </div>
                </div>
            </div>
        </div>
    )
}
