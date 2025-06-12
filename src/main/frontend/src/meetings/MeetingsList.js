import {useEffect, useState} from "react";

export default function MeetingsList({meetings,onButtonClick, onButtonDelete, onDelete}) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Uczestnicy</th>
                <th>Dodaj uczestnika</th>
                <th>Wypisz uczestnika</th>
                <th>Usuń spotkanie</th>
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>{meeting.participants.map(p => <li>{p.login}</li>)}</td>
                    <td><button type={"button"}
                                className={"button-outline"}
                                onClick={() => onButtonClick(meeting)}>Zapisz się</button></td>
                    <td><button type={"button"}
                                className={"button-outline"}
                                onClick={() => onButtonDelete(meeting)}>Wypisz się</button></td>
                    <td><button type={"button"}
                                className={"button-outline"}
                                onClick={() => onDelete(meeting)}>Usuń</button></td>
                </tr>)
            }
            </tbody>
        </table>
    );
}