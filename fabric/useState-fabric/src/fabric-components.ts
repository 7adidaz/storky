import { fabric } from 'fabric';

function getGridLines(canvas: fabric.Canvas) {
    const grid = 50;
    const gridColor = 'black';
    const gridLineParams = {
        stroke: gridColor,
        strokeWidth: 1,
        selectable: false,
        evented: false,
        hoverCursor: 'default',
    };
    const gridLines = [];
    for (let i = 0; i < canvas.width / grid; i++) {
        gridLines.push(new fabric.Line([i * grid, 0, i * grid, canvas.height], gridLineParams));
    }
    for (let i = 0; i < canvas.height / grid; i++) {
        gridLines.push(new fabric.Line([0, i * grid, canvas.width, i * grid], gridLineParams));
    }
    const newGridGroup = new fabric.Group(gridLines, {
        selectable: false,
        evented: false,
        hoverCursor: 'default',
    });

    return newGridGroup;
}

function ruler(canvas: fabric.Canvas) {
    let measurementThickness = 60;
    let tickSize = 10;
    let tickSizeFoot = 40;

    // Drag grid
    let count = 1;
    let footCount = 0;
    let grid = 30;


    let group = [];

    for (let i = 0; i < (canvas.width / grid); i++) {
        let offset = (i * grid),
            location1 = offset + measurementThickness,
            isFoot = ((i + 1) % 10) === 0 && i !== 0;

        group.push(new fabric.Line([location1, measurementThickness - tickSize, location1, measurementThickness], { stroke: '#888', selectable: false }));
        group.push(new fabric.Text(count + "mm", {
            left: location1,
            top: measurementThickness - (tickSize * 2) - 4,
            fontSize: 7,
            fontFamily: 'san-serif'
        }));

        if (isFoot) {
            footCount++;
            group.push(new fabric.Line([location1, measurementThickness - tickSizeFoot, location1, measurementThickness], { stroke: '#222', selectable: false }));
            group.push(new fabric.Text(footCount + "cm", {
                left: location1 + 4,
                top: measurementThickness - (tickSizeFoot) - 7,
                fontSize: 12,
                fontFamily: 'san-serif'
            }));
        }
        count++
    }
    const group_ = new fabric.Group(group, {
        lockScalingX: true,
        lockScalingY: true,
    });

    return group_;
}

function getHeight(sides: number[]) {
    const s1 = sides[0];
    const s2 = sides[1];
    const s3 = sides[2];

    const s = (s1 + s2 + s3) / 2;

    // Compute the differences
    const sa = s - s1;
    const sb = s - s2;
    const sc = s - s3;

    // Calculate the area
    const area = Math.sqrt(s * sa * sb * sc);

    // Calculate the height
    const height = (2 * area) / s1;

    return height;
}

export { getGridLines, ruler, getHeight };
