var url = "https://36e69cb8-cc8f-49fe-b48b-8ed4b2a2d9e9.mock.pstmn.io/"
import React, { Component } from 'react';

/*export function getInstallations(load, instalList, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    const installations = new Map();
    let installList = {};
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // Simple GET request using fetch
    fetch(url + "installations", requestOptions)
        .then(response => response.text())
        .then(result => JSON.parse(result))
        .then(json => {
            for (let key in json["data"]) {
                let installName = json["data"][key]["name"];
                installList[installName] = installName;
                let devices = [];
                for (let install in json["data"][key]["monitoring_systems"]["data"]) {

                    for (let device in json["data"][key]["monitoring_systems"]["data"][install]["devices"]["data"]) {
                        devices.push(json["data"][key]["monitoring_systems"]["data"][install]["devices"]["data"][device]);
                    }
                }
                installations.set(installName, devices)
            }
        })//make a map of the installations with their id
        .then(() => { load(); instalList(installList); })
        .catch(error => console.log('error', error));

    return installations;
}*/

export async function authentification(login,password) {

    var formdata = new FormData();
    formdata.append("email", login);
    formdata.append("password", password);

    
    let data = {};

    await fetch(url + "signin", {
        method: 'POST',
        body: formdata,

    }).then(response => response.text())
        .then(result => {data = JSON.parse(result); console.log(data)})
        .catch(error => console.log('error', error));
    return data
}

export async function reset(mail) {

    var formdata = new FormData();
    formdata.append("email", mail);

    let data = {};

    await fetch(url + "reset", {
        method: 'POST',
        body: formdata,

    }).then(response => response.text())
        .then(result => {data = JSON.parse(result); console.log(data)})
        .catch(error => console.log('error', error));
    return data
}

export async function signup(mail, username, password) {

    var formdata = new FormData();
    formdata.append("email", mail);
    formdata.append("username", username);
    formdata.append("password", password);

    let data = {};

    await fetch(url + "signup", {
        method: 'POST',
        body: formdata,

    }).then(response => response.text())
        .then(result => {data = JSON.parse(result); console.log(data)})
        .catch(error => console.log('error', error));
    return data
}

export async function gettingSite(token,userId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("userId", userId);

    let data = {};

    await fetch(url + "usersite", {
        method: 'POST',
        body: formdata,


    }).then(response => response.text())
        .then(result => {data = JSON.parse(result);})
        .catch(error => console.log('error', error));
    return data
}