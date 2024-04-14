const maxDistance = (points) => {
    const sum = [Infinity, -Infinity];
    const sum_i = [-1, -1];
    const diff = [Infinity, -Infinity];
    const diff_i = [-1, -1];

    for (let i = 0; i < points.length; i++) {
        if (sum[0] > points[i][0] + points[i][1]) {
            sum[0] = points[i][0] + points[i][1];
            sum_i[0] = i;
        }

        if (sum[1] < points[i][0] + points[i][1]) {
            sum[1] = points[i][0] + points[i][1];
            sum_i[1] = i;
        }

        if (diff[0] > points[i][0] - points[i][1]) {
            diff[0] = points[i][0] - points[i][1];
            diff_i[0] = i;
        }

        if (diff[1] < points[i][0] - points[i][1]) {
            diff[1] = points[i][0] - points[i][1];
            diff_i[1] = i;
        }
    }
    if (sum[1] - sum[0] > diff[1] - diff[0]) {
        console.log('sum', points[sum_i[0]], points[sum_i[1]])
        return [ sum[1] - sum[0], ...sum_i ];
    }
    console.log('diff', points[diff_i[0]], points[diff_i[1]])
    return [ diff[1] - diff[0], ...diff_i ];
}

console.log(maxDistance([[3,10],[5,15],[10,2],[4,4]]))