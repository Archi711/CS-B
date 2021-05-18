using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CSB
{
    public partial class odczyt : Form
    {
        public odczyt()
        {
            InitializeComponent();
        }


        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void odczyt_Load(object sender, EventArgs e)
        {

        }
        DataClasses1DataContext repo = new DataClasses1DataContext();
        public void button1_Click(object sender, EventArgs e)
        {


            //zdefiniowanie zmiennej przechowującej dane wynikowe
            var zmiennaAktualizacyjna =
            //definicja zapytania zwracająca wszystkie wiersze w tabeli Osoba w formacie LINQ zgodnie z warunkiem where (wartość jest konwertowana na typ Int32)
            from wiersz in repo.MeterReads
            where wiersz.MeterReadID == System.Convert.ToInt32(txtID.Text.ToString())
            select wiersz;
            //dla każdego wiersza w zmiennej przechowującej dane wynikowe wykonaj operację wstawienia nowych wartości
            foreach (MeterReads wiersz in zmiennaAktualizacyjna)
            {
                try
                {
                    wiersz.HotUsage = int.Parse(txtCiepla.Text);
                    wiersz.ColdUsage = int.Parse(txtZimna.Text);
                    wiersz.IDDeliveryPoint = int.Parse(txtID.Text);
                    wiersz.ReadDate = DateTime.Parse(txtDate.Text);
                }

                catch (Exception ez)
                {
                    //Wyświetlenie informacji o ewentualnym wyjątku
                    MessageBox.Show(ez.ToString());
                    MessageBox.Show("Nieprawidłowa wartość odczytu");
                }
            }
            try
                {
                    //prześlij zmiany do bazy danych
                    repo.SubmitChanges();
                    ////Wywołanie funkcji pobierającej dane z bazy i wyświetlające je w obiekcie DataGridView
                    //Form1OdswiezGridaDanymi();
                }
                catch (Exception ex)
                {
                    //Wyświetlenie informacji o ewentualnym wyjątku
                    MessageBox.Show(ex.ToString());
                  
            }

              

                this.Hide();
                Form1 frm1 = new Form1();
                frm1.Show();
            


        }
    }
}

  
