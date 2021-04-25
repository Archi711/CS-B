using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace CS_B
{
    public partial class Entry_p : Form
    {
        public Entry_p()
        {
            InitializeComponent();
            this.StartPosition = FormStartPosition.Manual;
            this.Location = new Point(500, 20);
        }

        public static string SetValueFor_ink_id_txt = "";
       

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            SetValueFor_ink_id_txt = ink_id_txt.Text;         // przekazywanie wartości dla ID
            this.Hide();
            Form1 frm1 = new Form1();
            frm1.Show();
           
        }
    }
}
