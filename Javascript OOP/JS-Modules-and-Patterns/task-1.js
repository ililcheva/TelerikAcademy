'use strict';

function solve() {
    const VALIDATOR = {
        isString: function(x) {
            if (typeof x !== 'string') {
                throw 'Expression isn\'t string';
            }
        },
        isValidTitle: function(x) {
            let regex = new RegExp(/(^ )|( $)|( {2,})/, 'g');
            if (regex.test(x) || x.length < 2) {
                throw 'Invalid title!';
            }
        },
        areValidPresentations: function(xs) {
            for (const x of xs) {
                this.isString(x);
                this.isValidTitle(x);
            }
            if (!Array.isArray(xs) || !xs.length) {
                throw 'There aren\'t any presentations!';
            }
        },
        isValidName: function(x) {
            this.isString(x);
            let regex = new RegExp(/^[A-Z][a-z]*$/, 'g');
            if (!regex.test(x)) {
                throw 'Not a valid student\'s name';
            }
        },
        isValidNameCount: function(names) {
            if (names.length !== 2) {
                throw 'Student must have exactly two names!';
            }
        },
        isValidStudentID: function(x, arr) {
            if (!arr.find(s => s.ID === x)) {
                throw 'There\'s no such student';
            }
        },
        isValidHomeworkID: function(x, arr) {
            if (!arr[x - 1]) {
                throw 'There\'s no such presentation!';
            }
        },
        areValidResults: function(results, students) {
            if (results.find(r => (r.StudentID > students.length || r.StudentID < 0 || isNaN(r.StudentID)))) {
                throw 'Invalid StudentID';
            }
            if (results.find(r => isNaN(r.score))) {
                throw 'Score is not a number!';
            }
        }
    }

    const getNextId = (function() {
        let counter = -1;
        return function() {
            return counter += 1;
        };
    })();

    var Course = {
        title: '',
        presentations: [],
        students: [],
        init: function(title, presentations) {
            VALIDATOR.isString(title);
            VALIDATOR.isValidTitle(title);
            VALIDATOR.areValidPresentations(presentations);

            this.title = title;
            this.presentations = presentations;
            this.students = [];
            return this;
        },
        addStudent: function(name) {
            let names = name.split(' ');
            VALIDATOR.isValidNameCount(names);
            for (const name of names) {
                VALIDATOR.isValidName(name);
            }
            let currentId = getNextId();
            let student = {
                firstName: names[0],
                lastName: names[1],
                ID: currentId,
                homeworks: [],
                examScore: 0,
                finalScore: 0
            };
            this.students.push(student);
            return currentId;
        },
        getAllStudents: function() {
            let getStudents = [];
            this.students.forEach(s => getStudents.push({ firstname: s.firstName, lastname: s.lastName, id: s.ID }));
            return getStudents;
        },
        submitHomework: function(studentID, homeworkID) {
            VALIDATOR.isValidStudentID(studentID, this.students);
            VALIDATOR.isValidHomeworkID(homeworkID, this.presentations);
            let student = this.students.find(s => s.ID === studentID);
            student.homeworks.push(homeworkID);
        },
        pushExamResults: function(results) {
            VALIDATOR.areValidResults(results, this.students);
            let duplicateCheck = results.map(r => r.StudentID)
                .sort((a, b) => a - b)
                .filter((r, i, rs) => r === rs[i - 1]);
            if (duplicateCheck.length !== 0) {
                throw 'There is a cheater';
            }
            for (let student of this.students) {
                let studentIndex = results.findIndex(r => r.StudentID === student.ID);
                if (studentIndex !== -1) {
                    student.examScore = results[studentIndex].Score;
                }
            }
        },
        getTopStudents: function() {
            for (let student of students) {
                student.finalScore = (0.75 * student.examScore) + (0.25 * (student.homeworks.length / this.presentations.length));
            }
            this.students.sort((a, b) => a.finalScore < b.finalScore);
            return this.students.slice(0, 10);
        }
    };

    return Course;
}


module.exports = solve;
