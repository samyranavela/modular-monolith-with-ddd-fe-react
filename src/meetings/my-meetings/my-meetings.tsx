import { useEffect, useState } from 'react';
import {
    useNavigate
} from "react-router";
import { HttpClient } from '../../shared/http-client';

interface MemberMeeting {
    meetingId: string,
    title: string,
    locationAddress: string,
    locationCity: string,
    locationPostalCode: Date,
    termStartDate: string,
    termEndDate: string,
    roleCode: string
}

export function MyMeetings() {

    const [meetings, setMeetings] = useState<Array<MemberMeeting>>([]);

    useEffect(() => {
        loadMeetings();
    }, []);

    const navigate = useNavigate();

    function loadMeetings() {
        HttpClient.get<Array<MemberMeeting>>('api/meetings/meetings')
            .then(response => setMeetings(response))
            .catch(_ => { });
    }

    function onClick(meetingId: string) {
        navigate(`/meetings/${meetingId}`);
    }

    return (
        <div>
            <table>
                <thead>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Term</th>
                    <th>Role</th>
                    <th></th>
                </thead>

                {meetings.map(item =>
                    <tbody>
                        <td>{item.title} </td>
                        <td>{item.locationAddress}, {item.locationCity}</td>
                        <td>{item.termStartDate} -  {item.termEndDate}</td>
                        <td>{item.roleCode} </td>
                        <td><button onClick={() => onClick(item.meetingId)}>Go to meeting</button></td>
                    </tbody>
                )}

            </table>
        </div>
    )
}