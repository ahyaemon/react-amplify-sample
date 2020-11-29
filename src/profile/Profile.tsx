import {API, graphqlOperation} from "aws-amplify";
import React, {useContext, useEffect, useState} from "react";
import styles from "./Profile.module.css"
import {getUser} from "../graphql/queries";
import {AuthContext} from "../context/AuthProvider";
import {updateUser} from "../graphql/mutations";

type User = {
    id: string
    age: number | null
    comment: string | null
}

const UserItem: React.FC<User> = ({id, age, comment}) => (
    <div>
        <p>id: {id}</p>
        <p>age: {age}</p>
        <p>comment: {comment}</p>
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
    const [id, setId] = useState("gonbey")
    const [age, setAge] = useState<number | null>(0)
    const [comment, setComment] = useState<string | null>("comment")
    const [followingUsers] = useState<User[]>([])
    const [followedUsers] = useState<User[]>([])
    const [editable, setEditable] = useState(false)
    const authContext = useContext(AuthContext)

    useEffect(() => {
        async function fetchUser() {
            const result = await API.graphql(graphqlOperation(getUser)) as GraphqlResult<{ getUser: User }>
            const data = result.data
            console.log(data)
            if (data == null) {

            } else {
                const user = data.getUser
                setAge(user.age)
                setComment(user.comment)
            }
        }

        setId(authContext.authState.name)
        fetchUser()
    }, [])

    function handleEditClick() {
        setEditable(true)
    }

    async function handleDoneClick() {
        try {
            const result = await API.graphql(
                graphqlOperation(
                    updateUser,
                    {
                        id: authContext.authState.name,
                        age,
                        comment,
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
                    <span>id: {id}</span>
                </div>

                <EditableInput title="age" value={age} editable={editable}>
                    <input type="number" value={age ?? 0} onChange={(e) => { setAge(e.target.valueAsNumber)} }/>
                </EditableInput>

                <EditableInput title="comment" value={comment} editable={editable}>
                    <input type="text" value={comment ?? ''} onChange={(e) => {setComment(e.target.value)} }/>
                </EditableInput>

                <div>
                    <span>following:</span>
                    <div>
                        { followingUsers.map(f => UserItem(f)) }
                    </div>
                </div>

                <div>
                    <span>followed:</span>
                    <div>
                        { followedUsers.map(f => UserItem(f))}
                    </div>
                </div>
            </div>
        </div>
    )
}
