import {
    Link
} from 'react-router';
import { MyMeetingGroupProposalsList } from './my-meeting-group-proposals-list';
import { MyMeetingGroupsList } from './my-meeting-groups-list';

export function MyMeetingsGroups() {

    return (
        <div className="container">
            <Link to="/meeting-groups-create">Create new group</Link>

            <div>
                <MyMeetingGroupProposalsList />
            </div>
            <div>
                <MyMeetingGroupsList />
            </div>
        </div>
    )
}