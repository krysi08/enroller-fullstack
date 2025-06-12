import { useEffect, useState } from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({username}) {
    const [meetings, setMeetings] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    async function handleNewMeeting(meeting) {
        const response = await fetch(`/api/meetings`, {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const newMeetings = await response.json();
            const nextMeetings = [...meetings, newMeetings];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        }
    }

    useEffect(() => {

        fetchMeetings();
    }, []);

    async function fetchMeetings() {
        const response = await fetch(`/api/meetings`);
        if (response.ok) {
            const meetings = await response.json();
            setMeetings(meetings);
        }
    }

    async function handleDeleteMeeting(meeting) {
        const responseOfParticipants = await fetch(`/api/meetings/${meeting.id}/participants`,{
            method: 'GET',

        })
        const participants = await responseOfParticipants.json();

        if (participants.length > 0) {
            console.log("Nie można usunąć spotkania – są zapisani uczestnicy.");
        }else{
            const response = await fetch(`/api/meetings/${meeting.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const nextMeetings = meetings.filter(m => m !== meeting);
                setMeetings(nextMeetings);
            }
        }
    }

    async function handleAddParticipant(meeting) {
        await fetch(`/api/participants/`,{
            method: 'POST',
            body: JSON.stringify({login: username}),
            headers: { 'Content-Type': 'application/json' }
        })
        await fetch(`/api/meetings/${meeting.id}/participants`, {
            method: 'POST',
            body: JSON.stringify({login: username}),
            headers: { 'Content-Type': 'application/json' }
        });

        await fetchMeetings();
    }

    async function handledDeleteParticipant(meeting){
        await fetch(`/api/meetings/${meeting.id}/participants/${username}`, {
            method: 'DELETE'
        });
        await fetch(`/api/participants/${username}`, {
            method: 'DELETE'
        });

        await fetchMeetings();
    }


    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings} username={username}
                              onButtonClick={handleAddParticipant}
                              onButtonDelete={handledDeleteParticipant}
                              onDelete={handleDeleteMeeting} />}
        </div>
    )
}
