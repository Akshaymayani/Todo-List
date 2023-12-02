import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "./TodoList.css";
import trash from "./trash-solid.svg";
import edit from "./edit.svg";


// const input = document.getElementById('search');

function TodoList() {
    const getdata = () => {
        let lists = localStorage.getItem('list');
        if (lists && lists !== 'undefined') {
            return JSON.parse(lists);
        } else {
            return [];
        }
    }

    const [data, setData] = useState(getdata);
    const [editid, setEditid] = useState('');
    const [toggle, setToggle] = useState(false);
    const [items, setItems] = useState('');

    const handlechange = (e) => {
        let name = e.target.value;
        setItems(name);
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        if (toggle) {
            const newData = data.map((dat, inex) => {
                if (editid === inex) {
                    return items;
                }
                return dat;
            });
            setData(newData)
            setToggle(false);
            setItems("");
            // localStorage.setItem('list', JSON.stringify(data));

        } else {
            if (items) {
                setData([...data, items]);
                setItems("");
            } else {
                alert("please enter the todo list");
            }
        }

    }
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(data));
    }, [data])

    function handledelete(id) {
        console.log(id + 1);
        const updatelist = data.filter((da, i) => {
            return i !== id
        });
        setData(updatelist);
    }

    function handleEdit(id) {
        setEditid(id);
        const datas = data.filter((data, index) => {
            return id === index;
        });
        setItems(...datas);
        setToggle(true);
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <form className="example mt-5" onSubmit={handlesubmit} style={{ margin: "auto", maxWidth: "400px" }}>
                            <input type="text" placeholder="Add Todo List.." name="search" id="search" onChange={handlechange} value={items} />
                            <button type="submit">
                                {
                                    toggle ? <span><img src={edit} alt="Edit" /></span> : <i className="fa fa-plus"></i>
                                }
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col listMenu">
                        <div className="lister">
                            <ul>
                                <div className="wrapper">
                                    {
                                        data?.map((d, i) => {
                                            return (
                                                <li key={i}>{d} <span style={{ float: "right" }}><img src={edit} alt="Edit" onClick={() => handleEdit(i)} />&nbsp;&nbsp;<img src={trash} alt="delete" onClick={() => handledelete(i)} /></span></li>
                                            );
                                        })
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList
