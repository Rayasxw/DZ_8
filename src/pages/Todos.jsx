
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../components/modal/Modal';

function Todos() {
    const { register, handleSubmit, reset,formState: { errors } } = useForm();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        TodosUsers();
    }, []);

    async function TodosUsers() {

        const response = await fetch('http://localhost:5000/users');

        const data = await response.json();
        setUsers(data);

    }

    async function addUser(data) {

        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(response.status === 201) {
            setMessage('Пользователь успешно создан');
            setModalOpen(true);
            TodosUsers();
            reset();

        }

    }

    async function deleteUser(id) {

        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 200) {
            setMessage('Пользователь удален');
            setModalOpen(true);
            TodosUsers();
        }


    }



    function handleCloseModal() {
        setModalOpen(false);
    }

    return (
        <div>
            <h1> Таблица пользователей</h1>
            <form onSubmit={handleSubmit(addUser)}>
                <label>
                    <input
                        className={errors.name && "error"}
                        type="text"
                        placeholder="Имя"
                        {...register('name', { required:true })}
                    />
                    {errors.name && <span>*Обязательное поле</span>}
                </label>
                <label >
                    <input
                        className={errors.name && "error"}
                        type="email"
                        placeholder="Email"
                        {...register('email', { required:true })}
                    />
                    {errors.name && <span>*Обязательное поле</span>}
                </label>
                <label>
                    <input
                        className={errors.name && "error"}
                        type="text"
                        placeholder="Username"
                        {...register('username', { required: true})}
                    />
                    {errors.name && <span>*Обязательное поле</span>}
                </label>

                <button type="submit">Создать пользователя</button>
            </form>
            <h2>Список пользователей</h2>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Список пуст</td>
                    </tr>
                )}
                </tbody>
            </table>
            {isModalOpen && (
                <Modal message={message} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default Todos;
