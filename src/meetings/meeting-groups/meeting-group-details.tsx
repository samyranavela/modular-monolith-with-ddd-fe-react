import { useEffect, useState } from 'react';
import {
    useParams,
    useNavigate
} from "react-router";
import { HttpClient } from '../../shared/http-client';

interface MeetingGroupDetails {
    id: string,
    name: string,
    description: string,
    locationCity: string,
    locationCountryCode: string,
    membersCount: number
}

export function MeetingGroupDetails() {
    const { meetingGroupId } = useParams();

    console.log(meetingGroupId);

    const [meetingGroupDetails, setMeetingGroupDetails] = useState<MeetingGroupDetails | null>(null);

    useEffect(() => {
        loadDetails();
    }, []);

    const navigate = useNavigate();

    function loadDetails() {
        HttpClient.get<MeetingGroupDetails>(`api/meetings/meetingGroups/${meetingGroupId}`)
            .then(response => setMeetingGroupDetails(response));
    }

    function onCreateNewMeeting() {
        navigate(`/meeting-groups/${meetingGroupId}/meetings/create`);
    }

    return (
        <div>
            {meetingGroupDetails !== null &&
                <div>
                    <div>ID: {meetingGroupDetails.id} </div>
                    <div>Name: {meetingGroupDetails.name} </div>
                    <div>Description: {meetingGroupDetails.description} </div>
                    <div>City: {meetingGroupDetails.locationCity} </div>
                    <div>Country: {meetingGroupDetails.locationCountryCode} </div>
                    <div>Members number: {meetingGroupDetails.membersCount} </div>

                    <button title="Create a new Meeting Group" onClick={() => onCreateNewMeeting()}>Create a new Meeting</button>
                </div>
            }
        </div>
    )
}