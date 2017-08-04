// Testing Student Module in Schools
QUnit.module('schools');

QUnit.test('Test: Student Log', function(assert){
	assert.expect(9);
	let done = assert.async();
	let student_code;
	frappe.run_serially([
		() => frappe.set_route("List", "Student"),
		() => frappe.timeout(0.5),
		() => frappe.tests.click_link('Fname Mname Lname'),
		() => frappe.timeout(0.5),
		() => {student_code = frappe.get_route()[2];},
		() => {
			return frappe.tests.make("Student Log", [
				{student: student_code},
				{academic_year: '2016-17'},
				{academic_term: '2016-17 (Semester 1)'},
				{program: "Standard Test"},
				{date: '2017-07-31'},
				{student_batch: 'A'},
				{log: 'This is Test log.'}
			]);
		},
		() => {
			assert.equal(cur_frm.doc.student, student_code, 'Student code was fetched properly');
			assert.equal(cur_frm.doc.student_name, 'Fname Mname Lname', 'Student name was correctly auto-fetched');
			assert.equal(cur_frm.doc.type, 'General', 'Default type selected');
			assert.equal(cur_frm.doc.academic_year, '2016-17');
			assert.equal(cur_frm.doc.academic_term, '2016-17 (Semester 1)');
			assert.equal(cur_frm.doc.program, 'Standard Test', 'Program correctly selected');
			assert.equal(cur_frm.doc.student_batch, 'A');
			assert.equal(cur_frm.doc.date, '2017-07-31');
			assert.equal(cur_frm.doc.log, 'This is Test log.');
		},
		() => done()
	]);
});