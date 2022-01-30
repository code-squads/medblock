import styled from 'styled-components'

import { ReactComponent as DownloadIconSvg } from '../assets/icons/general/download.svg';
import { ReactComponent as DashboardIconSvg } from '../assets/icons/hospital/dashboardicon.svg';

export const NoteSection = styled.div`
    display: inline-block;
    padding: 12px;
    color: #C93636;
    border-left: 6px solid #C93636;
`

export const DownloadIcon = styled(DownloadIconSvg)`
    margin-left: 4px;
    margin-top: -3px;
`;

export const DashboardIcon = styled(DashboardIconSvg)`
    margin-right: 5px;
    margin-top: -3px;
`;