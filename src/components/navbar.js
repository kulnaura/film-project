import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import * as sessionActions from './sessionActions';
import './../styles/navbar.css';

const BaseNavbar = React.createClass({
	render() {
		return (
			<div className="navbar">
				<ul className="base-list navbar-list">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/films">Films list</Link></li>
					<li><Link to="/rented-films">Rented Films list</Link></li>
					<li><Link to="/logout">Logout</Link></li>
					<li><Link to="/addfilm">Add film</Link></li>
				</ul>
			</div>
		)
	}
})

const AuthNavbar = React.createClass({
	render() {
		return (
			<div className="navbar">
				<ul className="base-list navbar-list">
					<li><Link to="/">Home</Link></li>
					<li><Link to="/login">Sign in</Link></li>
					<li><Link to="/registration">Registration</Link></li>
					<li><Link to="/films">Films list</Link></li>
					<li><Link to="/film">Film details</Link></li>
				</ul>
			</div>
		)
	}
})

class Navbar extends Component {
			        // TODO:
			        // Вынести рендер в 2 переменные Компонента Навбар
			        // Добавить в роутинг Логина проверку на переход со стейта и возврат после логина на этот стейт
			        // Добавить Варнинги в Логин
			        // 
			        // Добавить добавление фильмов, - иначе как я их получу с базы
			        // Добавить получение списка фильмов / Списка для юзера
			        // Получение данных фильма по ИД / Фильма по ИД для юзера
			        // 
			        //
			        // !!!!!!!!!!!!!!!!!!!!!!!!! Рефакторинг !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			        // !!! Переименовать и перенести компоненты,
			        // - Виды - где будут виды типа Логин, Регистрация, Фильмы
			        // 

			        // Дополнение ------------------
			        // ---------- Если хватит времени
			        // - Постраничная разбивка (Возможно есть библиотека для такого, или вобще библиотека для красивого 
			        // отображения списка)
			        // - Оставить место для удаления/редактирования фильма
	render() {
		if (sessionActions.checkAuth() === true) {
			return (
				<BaseNavbar />
			)
		} else {
			return (
				<AuthNavbar />
			)
		}
		
	}
}

					// <Link to="/">Main</Link>
					// <Link to="/">Sign in</Link>

// render(
// 	<Router routes={routes} />, 
// 	document.getElementById('root')
// );

export default Navbar;