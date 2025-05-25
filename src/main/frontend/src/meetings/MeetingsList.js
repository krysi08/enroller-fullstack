export default function MeetingsList({ meetings, onDelete, onJoin, onLeave }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Usuń spotkanie</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {meetings.map((meeting, index) => (
                <tr key={index}>
                    <td>{meeting.title}</td>
                    <td>{meeting.description}</td>
                    <td>
                        <button
                            type="button"
                            className="button-outline"
                            onClick={() => onDelete(meeting)}
                        >
                            Usuń
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="button-outline"
                            onClick={() => onJoin(meeting)}
                        >
                            Zapisz się
                        </button>
                        <button
                            type="button"
                            className="button-outline"
                            onClick={() => onLeave(meeting)}
                            style={{ marginLeft: '0.5rem' }}
                        >
                            Wypisz się
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}