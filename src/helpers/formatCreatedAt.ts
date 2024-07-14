import { format } from 'date-fns';

const formatCreatedAt = (createdAt: string) => format(createdAt, 'P');

export default formatCreatedAt;
